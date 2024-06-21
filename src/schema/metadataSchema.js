import version from '../../package.json' assert { type: "json" };

export const metadataSchema = {
  date: new Date(),
  taskData: {
    updateNotifier: {
      version: version.version,
    }
  }
}