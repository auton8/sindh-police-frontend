import {Constants} from '@services';

export class UpdateProfileUtils {
  static createUrlFronName(name) {
    return `${Constants.API_URL}uploads/${name}`;
  }
}
