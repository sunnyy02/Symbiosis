'use client';

import { useState } from 'react';
import HobbySelector from '@/components/HobbySelector';
import ProjectCard from '@/components/ProjectCard';
import EmailCapture from '@/components/EmailCapture';
import { Project } from '@/types';
import { Wand2, TrendingUp, Users, Rocket } from 'lucide-react';

export default function Home() {
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const generateIdea = async () => {
    if (!primary || !secondary) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/generate?primary=${primary}&secondary=${secondary}`);
      if (!response.ok) throw new Error('Failed to generate idea');
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error('Error generating idea:', error);
      // Fallback: Use a random project from our data
      const response = await fetch('/projects.json');
      const data = await response.json();
      const randomProject = data.projects[Math.floor(Math.random() * data.projects.length)];
      setProject(randomProject);
    }
    setIsLoading(false);
  };

  const handleGenerateAnother = () => {
    setProject(null);
    setPrimary('');
    setSecondary('');
  };

  const handleGetGuide = () => {
    setIsEmailModalOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-secondary/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-accent/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-none">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                Symbiosis
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 font-medium leading-relaxed">
              Fuse your existing skills with new curiosities to create <span className="text-primary font-bold">extraordinary projects</span>
            </p>

            <div className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-full shadow-lg border border-gray-100 mb-16 transform hover:scale-105 transition-transform duration-300">
              <Wand2 className="w-6 h-6 text-primary mr-3" />
              <span className="text-lg font-bold text-gray-800">
                52 unique project fusions waiting for you
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">300+</div>
                  <div className="text-gray-500 font-medium">Possible Combos</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-secondary/20 transition-all duration-300 group">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">20</div>
                  <div className="text-gray-500 font-medium">Core Hobbies</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl hover:border-accent/20 transition-all duration-300 group">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                  <Rocket className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">52</div>
                  <div className="text-gray-500 font-medium">Curated Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 -mt-10 relative z-10">
        {/* Generator */}
        <HobbySelector
          primary={primary}
          secondary={secondary}
          onPrimaryChange={setPrimary}
          onSecondaryChange={setSecondary}
          isLoading={isLoading}
        />

        {/* Generate Button (outside selector for better mobile flow) */}
        <div className="mb-16">
          <button
            onClick={generateIdea}
            disabled={!primary || !secondary || isLoading}
            className="w-full py-6 bg-gradient-to-r from-primary via-purple-500 to-secondary text-white text-2xl font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/30 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin mr-4"></div>
                  Crafting Your Idea...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Wand2 className="w-7 h-7 mr-3" />
                  Generate My Fusion Idea
                </span>
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Result */}
        {project && (
          <ProjectCard
            project={project}
            onGenerateAnother={handleGenerateAnother}
            onGetGuide={handleGetGuide}
          />
        )}

        {/* Example Projects */}
        {!project && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Example Fusions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { primary: 'Woodworking', secondary: 'Electronics', title: 'The Nervous Mirror' },
                { primary: 'Gardening', secondary: 'Data Viz', title: 'Emotional Weather Map' },
                { primary: 'Cooking', secondary: 'Mapmaking', title: 'Taste Atlas' },
                { primary: 'Photography', secondary: 'Foraging', title: 'Mushroom Portraits' },
              ].map((example, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-primary/30 transition-all cursor-pointer hover:shadow-xl group relative overflow-hidden"
                  onClick={() => {
                    setPrimary(example.primary);
                    setSecondary(example.secondary);
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>

                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></div>
                      <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                        {example.primary} × {example.secondary}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-2xl mb-2 group-hover:text-primary transition-colors">{example.title}</h3>
                    <p className="text-gray-500 font-medium">
                      Click to try this combination
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Email Modal */}
      {project && (
        <EmailCapture
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          projectTitle={project.title}
        />
      )}
    </>
  );
}