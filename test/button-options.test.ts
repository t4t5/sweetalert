import {
  getButtonListOpts,
  setUserButtonsDefaults,
  getUserButtonDefaults,
} from '../src/modules/options/buttons';

describe("return buttons options", () => {

  test("returns invisible buttons on false", () => {
    const opts = getButtonListOpts(false);

    expect(opts).toMatchObject({
      cancel: {
        visible: false,
      },
      confirm: {
        visible: false,
      },
    });
  });

  test("returns default obj on true", () => {
    const opts = getButtonListOpts(true);

    expect(opts).toMatchObject({
      cancel: {
        className: "",
        closeModal: true,
        text: "Cancel",
        value: null,
        visible: true,
      },
      confirm: {
        className: "",
        closeModal: true,
        text: "OK",
        value: true,
        visible: true,
      },
    });
  });

  test("returns single button on string", () => {
    const opts = getButtonListOpts("Test");

    expect(opts).toMatchObject({
      cancel: {
        visible: false,
      },
      confirm: {
        closeModal: true,
        text: "Test",
        value: true,
        visible: true,
      },
    });
  });

  test("returns two buttons on array of strings", () => {
    const opts = getButtonListOpts(["Annuler", "Confirmer"]);

    expect(opts).toMatchObject({
      cancel: {
        closeModal: true,
        text: "Annuler",
        value: null,
        visible: true,
      },
      confirm: {
        closeModal: true,
        text: "Confirmer",
        value: true,
        visible: true,
      },
    });
  });

  test("returns only cancel button when using boolean in array", () => {
    const opts = getButtonListOpts([true, false]);

    expect(opts).toMatchObject({
      cancel: {
        closeModal: true,
        text: "Cancel",
        value: null,
        visible: true,
      },
      confirm: {
        visible: false,
      },
    });
  });

  test("provides button defaults to buttons setUserButtonsDefaults method", () => {
    const SOMETHING = "something";
    const somethingText = "somethinng to execute";
    const somethingClass = "some class";
    const defaultOpts = {
      [SOMETHING]: {
        text: somethingText,
        className: somethingClass
      },
    };

    const userDefaultOpts = setUserButtonsDefaults(defaultOpts);
    const savedDefaultOpts = getUserButtonDefaults(SOMETHING);

    expect(savedDefaultOpts).toMatchObject({
      text: somethingText,
      className: somethingClass
    });
  });

  test("returns options using user set defaults as fallback", () => {
    const cancelClass = "cancel-user-default-class";
    const cancelText = "Just Cancel";
    const userDefaultOpts = setUserButtonsDefaults({
      cancel: { className: cancelClass },
    });

    const opts = getButtonListOpts({ cancel: { text: cancelText } });

    expect(opts).toMatchObject({
      cancel: {
        text: cancelText,
        className: cancelClass,
        visible: false,
        value: null,
      },
    });
  });

});
