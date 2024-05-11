// const handleSubscription = async (planId) => {
//     setLoading(true);
//     try {
//         const response = await fetch('/api/stripe', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ customerId: 'customer_id_here', planId }),
//         });
//         const data = await response.json();
//         console.log('Subscription successful:', data);
//         // Redirect or update UI
//     } catch (error) {
//         console.error('Subscription failed:', error);
//     } finally {
//         setLoading(false);
//     }
// };

// // Add buttons in your component for subscribing
// <button onClick={() => handleSubscription('plan_basic')}>Subscribe to Basic Plan</button>
// <button onClick={() => handleSubscription('plan_premium')}>Subscribe to Premium Plan</button>