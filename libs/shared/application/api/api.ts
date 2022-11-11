export type ApiRessourceItem<Item> = ApiRessourceItemBase & Item

export interface ApiRessourceItemBase {
  "@id":     string;
  "@type":   string;
  id:        number;
}

export interface ApiRessourceCollection<RessourceItem> {
  "@context":         string;
  "@id":              string;
  "@type":            string;
  "hydra:member":     ApiRessourceItem<RessourceItem>[];
  "hydra:totalItems": number;
  "hydra:search":     HydraSearch;
}

export interface HydraSearch {
  "@type":                        string;
  "hydra:template":               string;
  "hydra:variableRepresentation": string;
  "hydra:mapping":                HydraMapping[];
}

export interface HydraMapping {
  "@type":  string;
  variable: string;
  property: string;
  required: boolean;
}
