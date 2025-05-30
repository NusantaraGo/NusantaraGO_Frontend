import { postData } from "../../data/api";

class LoginPresenter {
  #loginPage;
  constructor({ loginPage }) {
    this.#loginPage = loginPage;
  }

  async sendDataToAPI(data) {
    try {
      const response = await postData(
        data,
        undefined,
        undefined,
        "/auth/login"
      );

      await this.#loginPage.successHandlerFetch(response);
      // langsung ke url dashboard
      window.location.replace("#/");
    } catch (error) {
      await this.#loginPage.errorHandlerFetch(error);
    }
  }
}

export default LoginPresenter;
