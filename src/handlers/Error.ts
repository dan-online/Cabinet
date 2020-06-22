/**
 * @name FsError
 */
export class FsError {
  action: { msg: string; file?: string; perm?: string };
  constructor(
    err: Error,
    action: { msg: string; file?: string; perm?: string }
  ) {
    this.action = action;
    switch (err.name) {
      case "PermissionDenied":
        this.permissionError(err);
        break;
      default:
        this.defaultError(err);
        break;
    }
  }
  permissionError(err: Error) {
    throw new Error(
      "permission denied when " +
        this.action.msg +
        (this.action.file ? ": " + this.action.file : "") +
        (this.action.perm
          ? ", try running with --allow-" + this.action.perm
          : "")
    );
  }
  defaultError(err: Error) {
    throw new Error("Error when " + this.action.msg + ": " + err.message);
  }
}
