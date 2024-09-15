import { TokenInfo } from "../_services/getTokenInfo";
import { YamlData } from "./yamlData";

export type FrameState = {
  strategyName: string | null;
  strategyDescription: string | null;
  currentStep: string;
  deploymentOption?: YamlData["gui"]["deployments"][0];
  bindings: any;
  deposits: { info: TokenInfo; amount: number }[];
  buttonPage: number;
  buttonMax?: number;
  textInputLabel: string;
  error: string | null;
  isWebapp?: boolean;
  tokenInfos: TokenInfo[];
};
