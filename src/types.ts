export interface Credential {
  id: string;
  type: string[];
  proof: Proof;
  issuer: string;
  "@context": string[];
  issuanceDate: Date;
  credentialSubject: CredentialSubject;
}

export interface CredentialSubject {
  id: string;
  PPAP?: Ppap;
  CTScans?: CTScans;
  batchUUID?: string;
  cellSampleUUID?: string;
  performanceMetrics?: PerformanceMetrics;
  safetyDurabilityTests?: SafetyDurabilityTests;
  batteryCellHomologation?: BatteryCellHomologation;
  temperatureToleranceTests?: TemperatureToleranceTests;
  esgScore?: string;
  location?: string;
  voltageMin?: string;
  batteryModel?: string;
  manufacturer?: string;
  batteryWeight?: string;
  cellChemistry?: CellChemistry;
  materialFiles?: File[];
  ratedCapacity?: string;
  voltageMaximum?: string;
  voltageNominal?: string;
  batteryCategory?: string;
  lifeCycleStatus?: string;
  supplyChainFiles?: File[];
  dueDiligenceScore?: string;
  manufacturingDate?: Date;
  certificationFiles?: File[];
  expectedLifetimeKm?: string;
  greenhouseGasScore?: string;
  manufacturingPlace?: string;
  chemistryComposition?: string;
  tripEnergyEfficiency?: string;
  expectedLifetimeMiles?: string;
  expectedLifetimeYears?: string;
  maximumPowerPermitted?: string;
  cycleLifeReferenceTest?: string;
  originalPowerCapability?: string;
  temperatureIdleStateMax?: string;
  temperatureIdleStateMin?: string;
  commercialWarrantyPeriod?: string;
  initialDischargeCapacity?: string;
  manufacturerIdentification?: string;
  exhaustionCapacityThreshold?: string;
}

export interface CTScans {
  impurities: string;
  anodeOverhang: string;
  batteryCellScan: BatteryCellScan;
  housingAndTheCathode: BatteryCellScan;
  casingCathodeAndAnode: BatteryCellScan;
  casingAndElectrodeAlignment: string;
}

export interface BatteryCellScan {
  scanDate: Date;
  scanImage: string;
  scanTitle: string;
  scanImageSize: string;
  QARequirementsMet: string;
}

export interface Ppap {
  QAConfirmed: boolean;
  approvalDate: Date;
}

export interface BatteryCellHomologation {
  chargeRate: string;
  energyDensity: number;
  lifeExpectancy: string;
}

export interface CellChemistry {
  anodeActiveMaterials: AnodeActiveMaterial[];
  anodeCompositionOther: AnodeActiveMaterial[];
  cathodeActiveMaterials: AnodeActiveMaterial[];
  electrolyteComposition: AnodeActiveMaterial[];
  cathodeCompositionOther: AnodeActiveMaterial[];
  recyclateContentActiveMaterials: AnodeActiveMaterial[];
}

export interface AnodeActiveMaterial {
  materialName: string;
  materialWeight: number;
  materialPercentageMassFraction: number;
}

export interface File {
  fileUrl: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
}

export interface PerformanceMetrics {
  energyDensity: number;
  capacityRetention: string;
  chargeDischargeRate: string;
}

export interface SafetyDurabilityTests {
  lifeCycle: string;
  vibrationShock: string;
  shortCircuitResistance: string;
}

export interface TemperatureToleranceTests {
  operatingRange: string;
  thermalStability: string;
  coolingEfficiency: string;
}

export interface Proof {
  jws: string;
  type: string;
  created: Date;
  proofPurpose: string;
  verificationMethod: string;
}
