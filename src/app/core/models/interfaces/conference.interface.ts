import { ConferenceType } from "../enums/conference-type.enum";
import { Manifestation } from "../enums/manifestation.enum";

export interface Conference {
  id?: string;
  title: string;
  description: string;
  type: ConferenceType;
  manifestation: Manifestation;
  domain: string;
  location: string;
  start_date: Date;
  end_date: Date;
  submission_deadline: Date;
  review_deadline: Date;
  decision_date: Date;
  website_url?: string;
  created_at?: Date;
}
