// Production api URL
const production = '';

// Development api URL
const development = 'http://localhost:5000';

export const url = process.env.NODE_ENV === 'development' ? development : production;