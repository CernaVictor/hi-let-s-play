import { FileWithPath } from '@mantine/dropzone';
import { DayOfTheWeek } from '../../common/types';

export type SportCenter = {
  id: string;
  name: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  offBusinessHours: OffBusinessHours;
  imageGallery: Photo[];
  sport: string;
};

export type Sport = {
  id: string;
  name: string;
};

export type SearchSportCenter = SportCenter & {
  sportFields: SportFieldWithSuggestions[];
};

export type Suggestion = {
  startDate: string;
  endDate: string;
};

export type SportFieldWithSuggestions = SportField & {
  suggestions: Suggestion[];
};

export type SearchResult = SportCenter & {
  sportFields: SportFieldWithSuggestions[];
};

export type Photo = {
  id: string;
  url: string;
  file?: FileWithPath;
};

export type OffBusinessHours = {
  id: string;
  activePeriods: Array<
    Omit<ActivePeriod, 'id'> & {
      id?: string;
    }
  >;
};

export type SportField = {
  id: string;
  name: string;
  description: string;
  isHeated: boolean;
  isIluminated: boolean;
  isIndoor: boolean;
  isCovered: boolean;
  sport: Sport;
};

export type Event = {
  id: string;
  activePeriods: ActivePeriod[];
  creator: {
    name: string;
  };
};

export type ActivePeriod = {
  id: string;
  dayOfTheWeek: DayOfTheWeek;
  startTime: string;
  duration: number;
  validFrom: string;
  validThrough: string;
};

export type FormatedEvent = {
  daysOfWeek: [string];
  startTime: string;
  duration: { minutes: number };
  startRecur: string;
  endRecur: string;
  activePeriodId: string;
  eventId: string;
  type: 'tournament' | 'singleEvent' | 'offBusinessHours';
  creator: {
    name: string;
  };
};

export type CreateEventDto = {
  sportFieldId: string;
  startTime: string;
  duration: number;
  validFrom: string;
  validThrough: string | null;
  dayOfTheWeek: DayOfTheWeek;
  bookerName: string;
};

export type CancelEventDto = {
  eventId: string;
  data: {
    activePeriodId: string;
    date: string;
  };
};

export type Statistics = {
  name: string;
  nrOfEvents: number;
  nrOfUsers: number;
  occupiedPercentage: number;
};

export type SearchDTO = {
  intervalStart?: string;
  intervalEnd?: string;
  duration?: string;
  sport?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
};

export type AuthDTO = {
  username: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  isSportsCenterOwner: boolean;
};

export type CancelEventData = {
  eventId: string;
  data: {
    date: string;
    activePeriodId: string;
  };
};
