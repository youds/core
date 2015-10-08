import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';

export default class SettingsModal extends Modal {
  init() {
    this.settings = {};
    this.loading = false;
  }

  form() {
    return '';
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          {this.form()}

          <div className="Form-group">
            {this.submitButton()}
          </div>
        </div>
      </div>
    );
  }

  submitButton() {
    return (
      <Button
        type="submit"
        className="Button Button--primary"
        loading={this.loading}
        disabled={!this.changed()}>
        Save Changes
      </Button>
    );
  }

  setting(key, fallback = '') {
    this.settings[key] = this.settings[key] || m.prop(app.settings[key] || fallback);

    return this.settings[key];
  }

  dirty() {
    const dirty = {};

    Object.keys(this.settings).forEach(key => {
      const value = this.settings[key]();

      if (value !== app.settings[key]) {
        dirty[key] = value;
      }
    });

    return dirty;
  }

  changed() {
    return Object.keys(this.dirty()).length;
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    saveSettings(this.dirty()).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
