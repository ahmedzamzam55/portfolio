/**
 * useProjects Hook
 * 
 * Service Layer — Contains ALL project filtering business logic.
 * Equivalent to ProjectService in Laravel.
 * 
 * Single Responsibility: Only manages project filtering state.
 * Dependency Inversion: Uses ProjectRepository for data access.
 */
import { useState, useEffect, useRef } from 'react';
import ProjectRepository from '../repositories/ProjectRepository';

export function useProjects(translations) {
  const [filter, setFilter] = useState('all');
  const gridRef = useRef(null);

  const categories = ProjectRepository.getCategories();
  const categoryLabels = ProjectRepository.getCategoryLabels(translations);
  const projects = ProjectRepository.getByCategory(translations, filter);

  // Re-trigger scroll animations when filter changes
  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.animate-on-scroll');
    cards.forEach((card) => card.classList.remove('visible'));

    const timer = setTimeout(() => {
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 100);
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [filter, projects.length]);

  return {
    filter,
    setFilter,
    categories,
    categoryLabels,
    projects,
    gridRef,
  };
}
