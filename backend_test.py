import requests
import sys
from datetime import datetime
import json

class SangharshClassesAPITester:
    def __init__(self, base_url="https://sangharsh-coaching.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"   Response: List with {len(response_data)} items")
                    else:
                        print(f"   Response keys: {list(response_data.keys()) if isinstance(response_data, dict) else 'Not a dict'}")
                except:
                    print(f"   Response: {response.text[:100]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_preview": response.text[:100] if not success else "OK"
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "response_preview": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_courses_api(self):
        """Test courses API"""
        success, response = self.run_test("Get Courses", "GET", "courses", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} courses")
            if len(response) > 0:
                print(f"   Sample course: {response[0].get('title', 'No title')}")
        return success

    def test_faculty_api(self):
        """Test faculty API"""
        success, response = self.run_test("Get Faculty", "GET", "faculty", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} faculty members")
            if len(response) > 0:
                print(f"   Sample faculty: {response[0].get('name', 'No name')}")
        return success

    def test_testimonials_api(self):
        """Test testimonials API"""
        success, response = self.run_test("Get Testimonials", "GET", "testimonials", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} testimonials")
            if len(response) > 0:
                print(f"   Sample testimonial: {response[0].get('name', 'No name')}")
        return success

    def test_gallery_api(self):
        """Test gallery API"""
        # Initialize gallery first
        init_success, _ = self.run_test("Initialize Gallery", "POST", "gallery/init", 200)
        
        # Get gallery images
        get_success, response = self.run_test("Get Gallery Images", "GET", "gallery", 200)
        if get_success and isinstance(response, list):
            print(f"   Found {len(response)} gallery images")
        
        return init_success and get_success

    def test_gallery_add_image(self):
        """Test adding a new gallery image"""
        test_image = {
            "title": "Test Image",
            "image_url": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
            "category": "test"
        }
        
        success, response = self.run_test("Add Gallery Image", "POST", "gallery", 200, test_image)
        if success:
            image_id = response.get('id')
            print(f"   Created image with ID: {image_id}")
            
            # Test deleting the image
            if image_id:
                delete_success, _ = self.run_test("Delete Gallery Image", "DELETE", f"gallery/{image_id}", 200)
                return success and delete_success
        
        return success

    def test_contact_form(self):
        """Test contact form submission"""
        test_contact = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "phone": "9876543210",
            "student_class": "class-12",
            "message": "This is a test message from automated testing"
        }
        
        success, response = self.run_test("Submit Contact Form", "POST", "contact", 200, test_contact)
        if success:
            print(f"   Contact form submitted with ID: {response.get('id')}")
        
        return success

    def test_get_contact_forms(self):
        """Test getting contact forms"""
        success, response = self.run_test("Get Contact Forms", "GET", "contact", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} contact form submissions")
        
        return success

def main():
    print("🚀 Starting Sangharsh Classes API Testing...")
    print("=" * 60)
    
    tester = SangharshClassesAPITester()
    
    # Test all endpoints
    tests = [
        ("Root API", tester.test_root_endpoint),
        ("Courses API", tester.test_courses_api),
        ("Faculty API", tester.test_faculty_api),
        ("Testimonials API", tester.test_testimonials_api),
        ("Gallery API", tester.test_gallery_api),
        ("Gallery Add/Delete", tester.test_gallery_add_image),
        ("Contact Form Submit", tester.test_contact_form),
        ("Contact Forms Get", tester.test_get_contact_forms),
    ]
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        try:
            test_func()
        except Exception as e:
            print(f"❌ Test {test_name} failed with exception: {str(e)}")
    
    # Print final results
    print(f"\n{'='*60}")
    print(f"📊 FINAL RESULTS")
    print(f"{'='*60}")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "0%")
    
    # Print failed tests
    failed_tests = [test for test in tester.test_results if not test['success']]
    if failed_tests:
        print(f"\n❌ Failed Tests ({len(failed_tests)}):")
        for test in failed_tests:
            print(f"   - {test['name']}: {test['actual_status']} (expected {test['expected_status']})")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())