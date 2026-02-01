from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Contact Form Model
class ContactFormCreate(BaseModel):
    name: str
    phone: str
    student_class: str
    message: str

class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    student_class: str
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Gallery Image Model
class GalleryImageCreate(BaseModel):
    title: str
    image_url: str
    category: str = "general"

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    image_url: str
    category: str = "general"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Faculty Model
class Faculty(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    qualification: str
    subject: str
    experience: str
    image_url: str

# Course Model
class Course(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    description: str
    subjects: List[str]
    duration: str
    target: str
    highlights: List[str]

# Testimonial Model
class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    student_class: str
    message: str
    achievement: str
    image_url: Optional[str] = None


# Routes
@api_router.get("/")
async def root():
    return {"message": "Sangharsh Classes API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Contact Form Routes
@api_router.post("/contact", response_model=ContactForm)
async def submit_contact_form(input: ContactFormCreate):
    contact_obj = ContactForm(**input.model_dump())
    doc = contact_obj.model_dump()
    await db.contact_forms.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactForm])
async def get_contact_forms():
    forms = await db.contact_forms.find({}, {"_id": 0}).to_list(1000)
    return forms

# Gallery Routes
@api_router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery_images():
    images = await db.gallery_images.find({}, {"_id": 0}).to_list(1000)
    return images

@api_router.post("/gallery", response_model=GalleryImage)
async def add_gallery_image(input: GalleryImageCreate):
    image_obj = GalleryImage(**input.model_dump())
    doc = image_obj.model_dump()
    await db.gallery_images.insert_one(doc)
    return image_obj

@api_router.delete("/gallery/{image_id}")
async def delete_gallery_image(image_id: str):
    result = await db.gallery_images.delete_one({"id": image_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted successfully"}

# Faculty Routes (Static data)
@api_router.get("/faculty", response_model=List[Faculty])
async def get_faculty():
    faculty_list = [
        {
            "id": "1",
            "name": "Dr. Rajesh Kumar",
            "qualification": "M.Sc., Ph.D. (Mathematics)",
            "subject": "Mathematics",
            "experience": "15+ years of teaching experience",
            "image_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
        },
        {
            "id": "2",
            "name": "Mrs. Priya Sharma",
            "qualification": "M.Sc. (Physics), B.Ed.",
            "subject": "Physics",
            "experience": "12+ years of teaching experience",
            "image_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"
        },
        {
            "id": "3",
            "name": "Mr. Amit Verma",
            "qualification": "M.Sc. (Chemistry), NET Qualified",
            "subject": "Chemistry",
            "experience": "10+ years of teaching experience",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        }
    ]
    return faculty_list

# Courses Routes (Static data)
@api_router.get("/courses", response_model=List[Course])
async def get_courses():
    courses_list = [
        {
            "id": "1",
            "title": "Class 9-10 Foundation",
            "description": "Build a strong foundation in Mathematics and Science for board exams and competitive preparation.",
            "subjects": ["Mathematics", "Science", "Physics", "Chemistry"],
            "duration": "1 Year Program",
            "target": "Class 9-10 Students",
            "highlights": ["Board Exam Preparation", "Concept Building", "Regular Tests", "Doubt Sessions"]
        },
        {
            "id": "2",
            "title": "Class 11-12 Science",
            "description": "Comprehensive coaching for CBSE/State board exams with focus on PCM subjects.",
            "subjects": ["Physics", "Chemistry", "Mathematics"],
            "duration": "2 Year Program",
            "target": "Class 11-12 Students",
            "highlights": ["Board Excellence", "JEE Foundation", "NEET Foundation", "Weekly Tests"]
        },
        {
            "id": "3",
            "title": "Competitive Exam Prep",
            "description": "Specialized coaching for JEE, NEET, and other competitive examinations.",
            "subjects": ["Physics", "Chemistry", "Mathematics", "Biology"],
            "duration": "Crash & Regular Courses",
            "target": "Competitive Exam Aspirants",
            "highlights": ["JEE Main/Advanced", "NEET Preparation", "Mock Tests", "Study Material"]
        }
    ]
    return courses_list

# Testimonials Routes (Static data)
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials_list = [
        {
            "id": "1",
            "name": "Rahul Singh",
            "student_class": "Class 12 - 2024 Batch",
            "message": "Sangharsh Classes helped me achieve my dream of scoring 95% in boards. The teachers here truly care about each student's progress.",
            "achievement": "95% in Board Exams",
            "image_url": None
        },
        {
            "id": "2",
            "name": "Priya Patel",
            "student_class": "JEE 2024",
            "message": "The competitive exam preparation at Sangharsh Classes is exceptional. Regular tests and personalized attention helped me crack JEE.",
            "achievement": "JEE Main Qualified",
            "image_url": None
        },
        {
            "id": "3",
            "name": "Amit Kumar",
            "student_class": "Class 10 - 2024 Batch",
            "message": "I was weak in Mathematics, but the teachers here made it so easy to understand. Now I love solving math problems!",
            "achievement": "90% in Mathematics",
            "image_url": None
        },
        {
            "id": "4",
            "name": "Sneha Gupta",
            "student_class": "NEET 2024",
            "message": "The biology and chemistry faculty at Sangharsh Classes are amazing. Their teaching methods made complex topics simple.",
            "achievement": "NEET Qualified",
            "image_url": None
        }
    ]
    return testimonials_list

# Initialize default gallery images
@api_router.post("/gallery/init")
async def initialize_gallery():
    existing = await db.gallery_images.count_documents({})
    if existing > 0:
        return {"message": "Gallery already initialized", "count": existing}
    
    default_images = [
        {
            "id": str(uuid.uuid4()),
            "title": "Students in Classroom",
            "image_url": "https://images.unsplash.com/flagged/photo-1574098335395-18cf525e45d6?w=600&h=400&fit=crop",
            "category": "classroom",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Science Lab Session",
            "image_url": "https://images.unsplash.com/photo-1594923544727-8794d5914331?w=600&h=400&fit=crop",
            "category": "lab",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Group Study",
            "image_url": "https://images.unsplash.com/photo-1597743622436-c6b5661731e0?w=600&h=400&fit=crop",
            "category": "study",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Mathematics Class",
            "image_url": "https://images.unsplash.com/photo-1722573783625-eceb04251036?w=600&h=400&fit=crop",
            "category": "classroom",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Student Achievement",
            "image_url": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
            "category": "achievement",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Library Study",
            "image_url": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
            "category": "study",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    await db.gallery_images.insert_many(default_images)
    return {"message": "Gallery initialized", "count": len(default_images)}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
