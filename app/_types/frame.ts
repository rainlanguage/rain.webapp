import { YamlData } from "./yamlData";

export type FrameState = {
  strategyName: string | null;
  strategyDescription: string | null;
  currentStep: string;
  deploymentOption?: YamlData["gui"]["deployments"][0];
  bindings: any;
  deposit: number | null;
  buttonPage: number;
  buttonMax?: number;
  textInputLabel: string;
  error: string | null;
  requiresTokenApproval: boolean;
  tokensApproved?: boolean;
  isWebapp?: boolean;
};
