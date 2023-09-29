

export interface ScooterOperation {
  plate: string;
  isActive: boolean
  setActive(): void
  setInactive(): void
}
