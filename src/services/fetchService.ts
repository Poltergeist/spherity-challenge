// Objective for this file is to create a service for fetch requests.
// I want to request a url and type validate the response. and then return the result.
import type { Credential } from "../types";
import type { Dispatch, SetStateAction } from "react";

type fetchServiceProps = {
  url: string;
  setError: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<SetStateAction<Credential[] | null>>;
};

export class fetchService {
  url = "";
  setError: Dispatch<SetStateAction<string | null>>;
  setData: Dispatch<SetStateAction<Credential[] | null>>;

  constructor(props: fetchServiceProps) {
    this.url = props.url;
    this.setError = props.setError;
    this.setData = props.setData;

    return this;
  }

  async fetchData() {
    const response = await fetch(this.url);
    const data = await response.json();

    if (!response.ok) {
      this.setError(
        `Failed to fetch data. status:${response.status} error: ${data.error} message: ${data.message}`,
      );
      return;
    }
    this.setData(data as Credential[]);
  }
}
