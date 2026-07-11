import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '../hooks/useContactForm';
import ContactRepository from '../repositories/ContactRepository';

vi.mock('../repositories/ContactRepository', () => {
  return {
    default: {
      submit: vi.fn(),
    },
  };
});

describe('useContactForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useContactForm('en'));

    expect(result.current.form).toEqual({ name: '', email: '', service: '', message: '' });
    expect(result.current.errors).toEqual({});
    expect(result.current.submitted).toBe(false);
    expect(result.current.submitError).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.honeypot).toBe('');
  });

  it('updates form values on handleChange', () => {
    const { result } = renderHook(() => useContactForm('en'));

    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Test User' } });
    });

    expect(result.current.form.name).toBe('Test User');
  });

  it('updates honeypot value on handleHoneypotChange', () => {
    const { result } = renderHook(() => useContactForm('en'));

    act(() => {
      result.current.handleHoneypotChange({ target: { value: 'bot-content' } });
    });

    expect(result.current.honeypot).toBe('bot-content');
  });

  it('silently ignores submit if honeypot is filled', async () => {
    const { result } = renderHook(() => useContactForm('en'));

    act(() => {
      result.current.handleHoneypotChange({ target: { value: 'spam' } });
    });

    const event = { preventDefault: vi.fn() };
    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(ContactRepository.submit).not.toHaveBeenCalled();
    expect(result.current.submitted).toBe(true);
  });

  it('validates and lists validation errors on submit', async () => {
    const { result } = renderHook(() => useContactForm('en'));

    const event = { preventDefault: vi.fn() };
    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(ContactRepository.submit).not.toHaveBeenCalled();
    expect(result.current.errors.name).toBe('Name is required');
    expect(result.current.errors.email).toBe('Email is required');
    expect(result.current.errors.message).toBe('Message is required');
  });

  it('submits form successfully when values are valid', async () => {
    ContactRepository.submit.mockResolvedValueOnce({ success: true });
    const { result } = renderHook(() => useContactForm('en'));

    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Ahmed Zamzam' } });
      result.current.handleChange({ target: { name: 'email', value: 'test@example.com' } });
      result.current.handleChange({ target: { name: 'message', value: 'Hello! I need a new project completed.' } });
    });

    const event = { preventDefault: vi.fn() };
    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(ContactRepository.submit).toHaveBeenCalledWith({
      name: 'Ahmed Zamzam',
      email: 'test@example.com',
      service: '',
      message: 'Hello! I need a new project completed.',
    });
    expect(result.current.submitted).toBe(true);
    expect(result.current.form).toEqual({ name: '', email: '', service: '', message: '' });
  });

  it('sets submitError to true when API fails', async () => {
    ContactRepository.submit.mockRejectedValueOnce(new Error('Network error'));
    const { result } = renderHook(() => useContactForm('en'));

    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Ahmed Zamzam' } });
      result.current.handleChange({ target: { name: 'email', value: 'test@example.com' } });
      result.current.handleChange({ target: { name: 'message', value: 'Hello! I need a new project completed.' } });
    });

    const event = { preventDefault: vi.fn() };
    await act(async () => {
      await result.current.handleSubmit(event);
    });

    expect(result.current.submitError).toBe(true);
    expect(result.current.submitted).toBe(false);
  });
});
