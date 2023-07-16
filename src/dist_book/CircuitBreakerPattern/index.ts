import axios, { AxiosResponse, AxiosError } from 'axios';

class CircuitBreaker {
  private isOpen: boolean;
  private failureThreshold: number;
  private failureCount: number;
  private retryTimeout: number;

  constructor(failureThreshold: number, retryTimeout: number) {
    this.isOpen = false;
    this.failureThreshold = failureThreshold;
    this.failureCount = 0;
    this.retryTimeout = retryTimeout;
  }

  async executeRequest(url: string): Promise<any> {
    if (this.isOpen) {
      return Promise.reject('Service is unavailable. Circuit Breaker is open.');
    }

    try {
      const response: AxiosResponse = await axios.get(url);
      this.resetFailureCount();
      return response.data;
    } catch (error) {
      this.handleFailure();
      throw error;
    }
  }

  handleFailure() {
    this.failureCount++;

    if (this.failureCount >= this.failureThreshold) {
      this.trip();
    }
  }

  trip() {
    this.isOpen = true;
    console.log('Circuit Breaker tripped. Service is unavailable.');

    setTimeout(() => {
      this.reset();
      console.log('Circuit Breaker reset. Service is available again.');
    }, this.retryTimeout);
  }

  resetFailureCount() {
    this.failureCount = 0;
  }

  reset() {
    this.isOpen = false;
    this.resetFailureCount();
  }
}

// Usage example
const circuitBreaker = new CircuitBreaker(3, 5000); // Failure threshold: 3, Retry timeout: 5 seconds

// Making requests using the Circuit Breaker
circuitBreaker.executeRequest('https://api.example.com/users')
  .then((data) => {
    console.log('Response:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
