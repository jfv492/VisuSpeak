import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';

const LatestFeedback = ({ organization }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Create a query against the 'feedbacks' collection
    const feedbackCollection = collection(db, 'feedbacks');
    const q = query(
      feedbackCollection,
      where('organization', '==', organization),
      // orderBy('createdAt', 'desc')
    );

    // Listen to query snapshot for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedbacksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Format date here if necessary
        createdAtFormatted: doc.data().createdAt.toDate().toLocaleDateString('en-US', {
          day: '2-digit', month: 'short', year: 'numeric'
        })
      }));
      setFeedbacks(feedbacksData.sort((a, b) => b.createdAt - a.createdAt));
    });

    return () => unsubscribe(); // Detach listener on unmount
  }, [organization]);

  if (feedbacks.length === 0) {
    return <div>No feedbacks available.</div>;
  }

  return (
    <div>
      {feedbacks.map(feedback => (
        <div key={feedback.id} className="card my-3">
          <div className="p-2">
            <div className="d-flex align-items-start mb-2">
              <i className="fas fa-user-circle fs-1 text-secondary me-2"></i>
              <div>
                <h6 className="card-title mb-0 chat-name-ellipsis">{feedback.name || 'Anonymous'}</h6>
                <p className="card-text text-muted">{feedback.createdAtFormatted}</p>
              </div>
              <div className='ms-auto'>
              {Array.from({ length: 5 }, (_, index) => (
                <i key={index} className={`fas fa-star ${index < feedback.rating ? 'text-warning' : 'text-secondary'}`}></i>
              ))}
            </div>
            </div>
            <p className="card-text">{feedback.feedback}</p>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestFeedback;
