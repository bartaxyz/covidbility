import { LocalStorageSchema, LocalStorageSchemaKey } from "./schema";

const prefix = "@data";

const watchers: {
  key: LocalStorageSchemaKey;
  callback: (data: any) => void;
}[] = [];

export const write = <T extends LocalStorageSchemaKey>(
  key: T,
  data: LocalStorageSchema[T]
) => {
  localStorage.setItem(`${prefix}/${key}`, JSON.stringify({ data }));

  watchers.forEach((watcher) => {
    if (watcher.key === key) {
      watcher.callback(data);
    }
  })
};

export const read = <T extends LocalStorageSchemaKey>(
  key: T
): LocalStorageSchema[T] | undefined => {
  const response = localStorage.getItem(`${prefix}/${key}`);

  if (!response) {
    return undefined;
  }

  const jsonResponse: {
    expires: number;
    data: LocalStorageSchema[T];
  } = JSON.parse(response);

  if (!jsonResponse) {
    return undefined;
  }

  const { data } = jsonResponse;

  return data;
};

export const watch = <T extends LocalStorageSchemaKey>(
  key: T,
  callback: (data: LocalStorageSchema[T] | undefined) => void
) => {
  callback(read(key));
  watchers.push({ key, callback });
};

export const clear = () => {
  localStorage.clear();
}
