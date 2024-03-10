import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const TermsAndConditions = ({ onAccept }) => {
  const { t } = useTranslation();
  return (
    <div>
      <Link
        className="hyperlink ms-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        {t("TermsAndConditions")}
      </Link>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Terms and Conditions:
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>
                These terms and conditions ("Terms") govern your use of
                VisuSpeak provided by VisuSpeak ("we," "us," or "our"). By
                accessing or using the Application, you agree to be bound by
                these Terms. If you do not agree to these Terms, you may not
                access or use the Application.
              </p>

              <h4>1. Use of the Application</h4>
              <p>
                1.1 You agree to use the Application only for lawful purposes
                and in accordance with these Terms.
              </p>
              <p>
                1.2 You are responsible for ensuring the accuracy and legality
                of any content you submit or upload to the Application.
              </p>

              <h4>2. Intellectual Property Rights</h4>
              <p>
                2.1 The Application and its original content, features, and
                functionality are owned by VisuSpeak and are protected by
                international copyright, trademark, patent, trade secret, and
                other intellectual property or proprietary rights laws.
              </p>
              <p>
                2.2 You may not modify, reproduce, distribute, transmit,
                display, perform, or create derivative works from any content
                available through the Application without the prior written
                consent of VisuSpeak.
              </p>

              <h4>3. Disclaimer of Warranties</h4>
              <p>
                3.1 The Application is provided on an "as-is" and "as-available"
                basis. We make no representations or warranties of any kind,
                express or implied, regarding the accuracy, reliability, or
                availability of the Application.
              </p>
              <p>
                3.2 We disclaim all warranties, express or implied, including
                but not limited to implied warranties of merchantability,
                fitness for a particular purpose, and non-infringement.
              </p>
              <p>
                3.3 The predicted words provided by the AI model are generated
                based on a trained dataset. While we strive for accuracy, we
                cannot guarantee the precise interpretation of signed words.
                Users should exercise discretion when relying on the predicted
                words and understand that the accuracy may vary. We do not
                assume responsibility for any inaccuracies in the predictions.
              </p>

              <h4>4. Limitation of Liability</h4>
              <p>
                4.1 In no event shall VisuSpeak, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses, resulting from (i)
                your access to or use of or inability to access or use the
                Application; (ii) any conduct or content of any third party on
                the Application.
              </p>

              <h4>5. Governing Law</h4>
              <p>
                5.1 These Terms shall be governed by and construed in accordance
                with the laws of Canada, without regard to its conflict of law
                provisions.
              </p>
              <p>
                5.2 Users from international jurisdictions are responsible for
                compliance with local laws regarding the use of the Application.
              </p>

              <h4>6. Changes to Terms</h4>
              <p>
                6.1 We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will provide at least 30 days' notice prior to any new terms
                taking effect.
              </p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                class="btn modal-button-style btn-raised rounded-pill"
                data-bs-dismiss="modal" // Add this if not already present to close the modal on click
                onClick={onAccept} // Use the passed callback function here
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
