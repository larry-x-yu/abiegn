export interface WizardStep {
    canEnter(): boolean;
    canExit(): boolean;
}
