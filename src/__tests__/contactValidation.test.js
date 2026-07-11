import { describe, it, expect } from 'vitest';
import { sanitize, isAllowedService, validateContactForm } from '../validations/contactValidation';

describe('sanitize', () => {
  it('strips basic HTML tags', () => {
    expect(sanitize('<script>alert(1)</script>')).toBe('alert(1)');
  });

  it('strips nested/obfuscated tags', () => {
    expect(sanitize('<scr<script>ipt>alert(1)</scr</script>ipt>')).toBe('ipt>alert(1)ipt>');
  });

  it('removes javascript: protocol', () => {
    expect(sanitize('javascript:alert(1)')).toBe('alert(1)');
  });

  it('removes event handlers', () => {
    expect(sanitize('onload=alert(1)')).toBe('alert(1)');
    expect(sanitize('onclick = doEvil()')).toBe('doEvil()');
  });

  it('removes data: URI', () => {
    expect(sanitize('data:text/html,<h1>hi</h1>')).toBe('text/html,hi');
  });

  it('returns empty string for non-string input', () => {
    expect(sanitize(null)).toBe('');
    expect(sanitize(undefined)).toBe('');
    expect(sanitize(123)).toBe('');
  });

  it('trims whitespace', () => {
    expect(sanitize('  hello  ')).toBe('hello');
  });

  it('preserves normal text', () => {
    expect(sanitize('Hello, my name is Ahmed')).toBe('Hello, my name is Ahmed');
  });

  it('preserves Arabic text', () => {
    expect(sanitize('مرحباً، أنا أحمد')).toBe('مرحباً، أنا أحمد');
  });
});

describe('isAllowedService', () => {
  it('returns true for valid services', () => {
    expect(isAllowedService('')).toBe(true);
    expect(isAllowedService('basic')).toBe(true);
    expect(isAllowedService('professional')).toBe(true);
    expect(isAllowedService('enterprise')).toBe(true);
    expect(isAllowedService('custom')).toBe(true);
  });

  it('returns false for invalid services', () => {
    expect(isAllowedService('hacked')).toBe(false);
    expect(isAllowedService('<script>')).toBe(false);
    expect(isAllowedService('premium')).toBe(false);
  });
});

describe('validateContactForm', () => {
  const validForm = {
    name: 'Ahmed Zamzam',
    email: 'test@example.com',
    service: 'basic',
    message: 'Hello, I would like to discuss a project.',
  };

  it('passes valid form data', () => {
    const result = validateContactForm(validForm, 'en');
    expect(result.isValid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('fails when name is missing', () => {
    const result = validateContactForm({ ...validForm, name: '' }, 'en');
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('Name is required');
  });

  it('fails when name is too short', () => {
    const result = validateContactForm({ ...validForm, name: 'A' }, 'en');
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('Name is too short');
  });

  it('fails when email is missing', () => {
    const result = validateContactForm({ ...validForm, email: '' }, 'en');
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Email is required');
  });

  it('fails when email is invalid', () => {
    const result = validateContactForm({ ...validForm, email: 'not-an-email' }, 'en');
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Invalid email address');
  });

  it('fails when message is too short', () => {
    const result = validateContactForm({ ...validForm, message: 'Hi' }, 'en');
    expect(result.isValid).toBe(false);
    expect(result.errors.message).toBe('Message too short (min 10 chars)');
  });

  it('fails when service is not in whitelist', () => {
    const result = validateContactForm({ ...validForm, service: 'hacked' }, 'en');
    expect(result.isValid).toBe(false);
    expect(result.errors.service).toBe('Invalid service selected');
  });

  it('returns Arabic messages when lang is ar', () => {
    const result = validateContactForm({ ...validForm, name: '' }, 'ar');
    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe('الاسم مطلوب');
  });

  it('sanitizes XSS in name field', () => {
    const result = validateContactForm({ ...validForm, name: '<script>alert(1)</script>' }, 'en');
    // sanitize strips tags → "alert(1)" which is >= 2 chars, so it should pass
    expect(result.isValid).toBe(true);
  });
});
