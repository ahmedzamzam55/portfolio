import { describe, it, expect, vi, beforeEach } from 'vitest';
import ContactRepository from '../repositories/ContactRepository';

describe('ContactRepository', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('submits form data successfully', async () => {
    const mockResponse = { success: true };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const formData = {
      name: 'Ahmed Zamzam',
      email: 'zahmd8920@gmail.com',
      service: 'professional',
      message: 'Hello, I want a professional CRM system.',
    };

    const result = await ContactRepository.submit(formData);

    expect(fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: 'Ahmed Zamzam',
        email: 'zahmd8920@gmail.com',
        service: 'professional',
        message: 'Hello, I want a professional CRM system.',
      }),
    });
    expect(result).toEqual(mockResponse);
  });

  it('submits with turnstile token when provided', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const formData = {
      name: 'Ahmed Zamzam',
      email: 'zahmd8920@gmail.com',
      service: 'basic',
      message: 'Hello, testing Turnstile integration.',
    };

    await ContactRepository.submit(formData, 'mock-token-123');

    expect(fetch).toHaveBeenCalledWith('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: 'Ahmed Zamzam',
        email: 'zahmd8920@gmail.com',
        service: 'basic',
        message: 'Hello, testing Turnstile integration.',
        turnstileToken: 'mock-token-123',
      }),
    });
  });

  it('throws error when fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal server error' }),
    });

    const formData = {
      name: 'Ahmed Zamzam',
      email: 'zahmd8920@gmail.com',
      service: 'custom',
      message: 'This is a test message.',
    };

    await expect(ContactRepository.submit(formData)).rejects.toThrow('Internal server error');
  });

  it('throws error when sanitization results in empty critical fields', async () => {
    const formData = {
      name: '<script></script>', // Sanitizes to empty
      email: 'zahmd8920@gmail.com',
      service: 'basic',
      message: 'Hello, this is a message.',
    };

    await expect(ContactRepository.submit(formData)).rejects.toThrow('Invalid input detected after sanitization');
    expect(fetch).not.toHaveBeenCalled();
  });
});
