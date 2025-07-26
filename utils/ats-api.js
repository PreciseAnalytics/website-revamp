const ATS_API_BASE = 'https://precise-analytics-ats.vercel.app/api';

class ATSApiService {
  async fetchJobs() {
    try {
      const response = await fetch(`${ATS_API_BASE}/jobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  }

  async submitApplication(applicationData) {
    try {
      const response = await fetch(`${ATS_API_BASE}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });
      
      if (!response.ok) {
        throw new Error(`Failed to submit application: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  }
}

export default new ATSApiService();