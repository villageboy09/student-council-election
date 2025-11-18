// Import local candidate images
import sudhirImg from '../assets/sudhir.jpeg';
import chetanImg from '../assets/chetan.jpeg';
import modiImg from '../assets/modi.jpeg';
import karthikImg from '../assets/karthik.jpeg';
import sowmyaImg from '../assets/sowmya.jpeg';
import harshImg from '../assets/harsh.jpeg';

// Candidate data for all positions
export const candidates = {
  president: [
    {
      id: 'p1',
      name: 'Sudhir Pratap Singh',
      description: 'Candidate for President',
      photo: sudhirImg,
    },
    {
      id: 'p2',
      name: 'Chetan Kumar Tiwari',
      description: 'Candidate for President',
      photo: chetanImg,
    },
    {
      id: 'p3',
      name: 'Hemant Modi',
      description: 'Candidate for President',
      photo: modiImg,
    },
    {
      id: 'p4',
      name: 'Kartik Yadav',
      description: 'Candidate for President',
      photo: karthikImg,
    },
  ],
  treasurer: [
    {
      id: 't1',
      name: 'Somya Singhal',
      description: 'Candidate for Treasurer',
      photo: sowmyaImg,
    },
    {
      id: 't2',
      name: 'Harsh Kumar',
      description: 'Candidate for Treasurer',
      photo: harshImg,
    },
  ],
};

// Position labels
export const positionLabels = {
  president: 'President',
  treasurer: 'Treasurer',
};
