// src/utils/profileUtils.js

/**
 * Determines whether the employer profile is complete
 * based strictly on backend validation rules.
 *
 * Backend requirement:
 * - companyName is mandatory (@NotBlank)
 * - companyDescription is optional
 *
 * @param {Object} profile
 * @returns {boolean}
 */
export const isEmployerProfileComplete = (profile) => {
  // If profile doesn't exist → incomplete
  if (!profile) return false;

  // Check required field: companyName
  return Boolean(
    profile.companyName &&
    profile.companyName.trim()
  );
};