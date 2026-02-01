import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const GallerySection = ({ images, onRefresh }) => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [newImage, setNewImage] = useState({ title: '', image_url: '', category: 'general' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAddImage = async () => {
    if (!newImage.title || !newImage.image_url) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/gallery`, newImage);
      toast.success('Image added successfully!');
      setNewImage({ title: '', image_url: '', category: 'general' });
      onRefresh();
    } catch (error) {
      toast.error('Failed to add image');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`${API}/gallery/${imageId}`);
      toast.success('Image deleted successfully!');
      onRefresh();
    } catch (error) {
      toast.error('Failed to delete image');
      console.error(error);
    }
  };

  return (
    <section 
      id="gallery" 
      data-testid="gallery-section"
      className="py-16 md:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sangharsh-blue font-semibold text-sm uppercase tracking-wider mb-4">
            Photo Gallery
          </span>
          <h2 className="font-outfit text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Life at Sangharsh Classes
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-6">
            A glimpse into our classrooms, labs, and student activities
          </p>

          {/* Admin Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdmin(!showAdmin)}
            className="text-sangharsh-blue border-sangharsh-blue hover:bg-sangharsh-blue/5"
            data-testid="gallery-admin-toggle"
          >
            <Plus className="w-4 h-4 mr-2" />
            {showAdmin ? 'Hide Admin Panel' : 'Add Photos'}
          </Button>
        </motion.div>

        {/* Admin Panel */}
        <AnimatePresence>
          {showAdmin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-outfit font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Add New Gallery Image
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input
                    placeholder="Image Title"
                    value={newImage.title}
                    onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
                    data-testid="gallery-title-input"
                  />
                  <Input
                    placeholder="Image URL"
                    value={newImage.image_url}
                    onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                    data-testid="gallery-url-input"
                  />
                  <Button
                    onClick={handleAddImage}
                    disabled={isSubmitting}
                    className="bg-sangharsh-green hover:bg-sangharsh-green/90 text-white"
                    data-testid="gallery-add-btn"
                  >
                    {isSubmitting ? 'Adding...' : 'Add Image'}
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Tip: Use image URLs from services like Unsplash, Pexels, or your own hosted images
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid - Masonry Style */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="gallery-item break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer"
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={image.image_url}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                onClick={() => setSelectedImage(image)}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white font-medium text-sm">{image.title}</p>
                <span className="text-white/70 text-xs capitalize">{image.category}</span>
              </div>

              {/* Delete Button (Admin Mode) */}
              {showAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image.id);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                  data-testid={`gallery-delete-${index}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {images.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No gallery images yet. Add some photos!</p>
          </div>
        )}

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            {selectedImage && (
              <>
                <img
                  src={selectedImage.image_url}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-outfit font-semibold text-slate-900">{selectedImage.title}</h3>
                  <p className="text-sm text-slate-500 capitalize">{selectedImage.category}</p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default GallerySection;
