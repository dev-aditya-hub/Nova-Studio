export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateContactForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name must be under 100 characters";
  }

  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.message || data.message.trim().length === 0) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (data.message.trim().length > 2000) {
    errors.message = "Message must be under 2000 characters";
  }

  return errors;
}

export function validateProject(data) {
  const errors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = "Project title is required";
  } else if (data.title.trim().length > 150) {
    errors.title = "Title must be under 150 characters";
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.category = "Category is required";
  }

  if (!data.imageUrl || data.imageUrl.trim().length === 0) {
    errors.imageUrl = "Image URL is required";
  }

  return errors;
}
