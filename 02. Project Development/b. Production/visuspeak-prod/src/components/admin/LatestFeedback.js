import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';

const LatestFeedback = () => {
    const [latestFeedback, setLatestFeedback] = useState(null);

    useEffect(() => {
      // Adjust the query to include a filter for the 'organization' field
      const feedbackCollection = collection(db, 'feedbacks');
      const q = query(
        feedbackCollection,
        // where('organization', '==', localStorage.getItem("organizationName")),
        orderBy('createdAt', 'desc'),
        limit(1)
      );
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const feedbackData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLatestFeedback(feedbackData[0]); // assuming there's at least one feedback
      });
  
      return () => unsubscribe(); // Cleanup subscription on unmount
    }, [localStorage.getItem("organizationName")]);

  if (!latestFeedback) {
    return <div>Loading...</div>;
  }

  const feedbackDate = latestFeedback.createdAt.toDate().toLocaleDateString('en-US', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  // Generate stars based on rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <i key={index} className={`fas fa-star ${index < latestFeedback.rating ? 'text-warning' : 'text-secondary'}`}></i>
  ));

  return (
    <div className="card my-3">
      <div className="p-3">
        <div className="d-flex align-items-start mb-3">
          <i className="fas fa-user-circle fa-3x text-secondary me-2"></i>
          <div>
            <h5 className="card-title mb-0">{latestFeedback.name || 'Anonymous'}</h5>
            <p className="card-text text-muted">{feedbackDate}</p>
          </div>
          <div className='ms-auto'>{stars}</div>
        </div>
        <p className="card-text">{latestFeedback.feedback}</p>
        
      </div>
    </div>
  );
};

export default LatestFeedback;
