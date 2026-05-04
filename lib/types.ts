export interface CreateResultRequest {
  athlete_no: string;
  performance: string;
  event_id: number;
  athlete_type: string;
  entered_by: string;
  rank?: number;
}

export interface Result {
  id: number;
  target_name: string;
  performance: string;
  event_id?: number;
  event_name: string;
  athlete_type: string;
  department_name: string;
  entered_by: string;
  created_at: string;
  rank: number;
  points: number;
  category: string;
  age_group: string;
  result_type: string;
  scoring_strategy: string;
}

export interface ListResponse<T> {
  ok: boolean;
  items: T[];
  page: number;
  page_size: number;
  total: number;
}

export interface OkResponse {
  ok: boolean;
  error?: string;
}
