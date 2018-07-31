const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_Tqebmm9chI8ljgVt2JPVzyod'
  : 'pk_test_Tqebmm9chI8ljgVt2JPVzyod';

export default STRIPE_PUBLISHABLE;