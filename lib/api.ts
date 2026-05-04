import type { CreateResultRequest, Result, ListResponse, OkResponse } from "./types";
import { getOperatorName, getEventId, getAthleteType } from "@/components/Watermark";

const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT ?? "";

export async function fetchResults(
  keyword?: string
): Promise<ListResponse<Result>> {
  const params = new URLSearchParams();
  const eventId = getEventId();

  if (keyword) params.set("keyword", keyword);
  if (eventId) params.set("event_id", String(eventId));
  params.set("page_size", "50");

  const res = await fetch(`${endpoint}/api/v1/results?${params}`);
  const json: ListResponse<Result> = await res.json();

  return json;
}

export async function createResult(
  athleteNo: string,
  performance: string
): Promise<OkResponse> {
  const body: CreateResultRequest = {
    athlete_no: athleteNo,
    performance,
    event_id: getEventId(),
    athlete_type: getAthleteType(),
    entered_by: getOperatorName(),
  };

  const res = await fetch(`${endpoint}/api/v1/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}
