
const app = {
  env: {
    production: 'production',
    development: 'development',
    test: 'test'
  },

  conventions: {
    number: 0,
    array: [],
    string: '',
    object: null
  },

  regex: {
    objectId: /^[0-9a-fA-F]{24}$/,
    phone: /^\+?1?(\d{10,12}$)/,
    email: /\S+@\S+\.\S+/,
    password: /^[a-f0-9]{32}$/
  },
  format: {
    date: 'DD/MM/YYYY, HH:mm'
  },
  errorResponse: {
    empty: 'This field is not empty',
    create: 'Create failed!',
    update: 'Update failed!',
    destroy: 'Delete failed!',
    show: 'Not Found!',
    existed: 'Title field already existed!',
    common: 'Name field or Email field already existed!',
    format: 'SVG format is not supported',
    limit: 'File size must be smaller 5MB',
    invalidFile: 'File format must be png or jpg or gif or jpeg!'
  },
  refreshTokenLifeTime: '30d',
  db: {
    port: 3005,
    host: 'mongodb://balotv:ptran068@ds255794.mlab.com:55794/balotv',
    // host: 'mongodb://localhost:27017/socket',
    bodyLimit: '100kb'
  },
  secret: '77yIw21VsG',
}

export default app
