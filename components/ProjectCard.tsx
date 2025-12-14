import { Project } from '@/types';
import { Star, Clock, Tag, Zap } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onGenerateAnother?: () => void;
  onGetGuide?: () => void;
}

export default function ProjectCard({ project, onGenerateAnother, onGetGuide }: ProjectCardProps) {
  return (
    <div className="animate-fade-in bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

      {/* Header */}
      <div className="relative flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div className="flex-1">
          <span className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary rounded-full text-sm font-bold mb-4 tracking-wide uppercase">
            <Zap className="w-3 h-3 mr-2" />
            {project.primary} × {project.secondary}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">{project.title}</h2>
        </div>

        <div className="flex flex-col items-end gap-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Difficulty</div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < project.difficulty ? 'fill-accent text-accent' : 'text-gray-200'}`}
              />
            ))}
          </div>
          <div className="flex items-center text-gray-600 text-sm font-medium mt-1">
            <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
            {project.time}
          </div>
        </div>
      </div>

      {/* Hook */}
      <div className="relative bg-gradient-to-r from-primary/5 via-white to-secondary/5 p-8 rounded-2xl mb-10 border border-primary/10">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-l-2xl"></div>
        <p className="text-xl md:text-2xl text-gray-800 italic leading-relaxed font-serif">
          "{project.hook}"
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-10 mb-10">
        {/* Skills */}
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mr-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
            Core Skills You'll Use
          </h3>
          <ul className="space-y-4">
            {project.skills.map((skill, i) => (
              <li key={i} className="flex items-start text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="font-medium">{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Output */}
        <div>
          <h3 className="font-bold text-gray-900 text-lg mb-5 flex items-center">
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center mr-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
            </div>
            What You'll Create
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6 text-lg">{project.output}</p>

          <div className="bg-secondary/5 p-5 rounded-2xl border border-secondary/10">
            <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Perfect For</h4>
            <p className="text-gray-600 text-sm">
              Someone who wants to bridge their <span className="font-bold text-secondary">{project.primary.toLowerCase()}</span> skills with something completely new.
            </p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-10 pt-8 border-t border-gray-100">
        <div className="flex items-center mb-4">
          <Tag className="w-4 h-4 text-gray-400 mr-2" />
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Project Vibes</h4>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-4 py-2 bg-white text-gray-600 rounded-xl text-sm font-bold border-2 border-gray-100 hover:border-primary/30 hover:text-primary transition-colors cursor-default"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onGenerateAnother}
          className="flex-1 py-4 bg-white border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:border-primary hover:text-primary transition-all duration-200 group"
        >
          Generate Another Idea
        </button>

        <button
          onClick={onGetGuide}
          className="flex-1 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Get Full Guide & 5 More Ideas
        </button>
      </div>
    </div>
  );
}