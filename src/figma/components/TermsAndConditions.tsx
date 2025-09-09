import { useState } from 'react';
import { BackArrow } from './BackArrow';

interface TermsAndConditionsProps {
  onAccept: () => void;
  onBack: () => void;
}

export function TermsAndConditions({ onAccept, onBack }: TermsAndConditionsProps) {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
    if (isNearBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const handleAccept = () => {
    if (hasAccepted && hasScrolledToBottom) {
      onAccept();
    }
  };

  return (
    <div
      className="size-full flex flex-col relative"
      style={{ background: 'linear-gradient(180deg, #f8f9fa 0%, rgba(100, 41, 117, 0.2) 100%)' }}
    >
      {/* Header with back arrow - matching onboarding carousel positioning */}
      <div className="flex items-center justify-between p-6">
        <BackArrow onClick={onBack} />
        <div className="flex-1"></div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6" onScroll={handleScroll}>
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl" style={{ fontFamily: 'Inter', fontWeight: 600 }}>
            Terms & Conditions
          </h1>
        </div>
        <div className="space-y-6 text-gray-800" style={{ fontFamily: 'Inter' }}>
          {/* Introduction */}
          <div>
            <p>
              Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully
              before using the www.ourcodeword.com website and the Codeword mobile application
              (together, or individually, the "Service") operated by Codeword Technologies ("us",
              "we", or "our").
            </p>
            <p className="mt-4">
              Your access to and use of the Service is conditioned upon your acceptance of and
              compliance with these Terms. These Terms apply to all visitors, users and others who
              wish to access or use the Service.
            </p>
            <p className="mt-4">
              By accessing or using the Service you agree to be bound by these Terms. If you
              disagree with any part of the terms then you do not have permission to access the
              Service.
            </p>
          </div>

          {/* Data Privacy & Protection */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Data Privacy & Protection
            </h2>
            <p>
              Codeword collects and processes personal information to provide crisis intervention
              services. We are committed to protecting your privacy and will never sell your
              personal information. For details on data collection, usage, and your rights, please
              review our Privacy Policy at{' '}
              <a
                href="https://www.ourcodeword.com/privacy-policy"
                className="underline"
                style={{ color: '#642975' }}
              >
                www.ourcodeword.com/privacy-policy
              </a>
            </p>
          </div>

          {/* Accounts */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Accounts
            </h2>
            <p>
              When you create an account with us, you guarantee that you are above the age of 18 or
              above 13, with parental or legal guardian permission, and that the information you
              provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or
              obsolete information may result in the immediate termination of your account on the
              Service.
            </p>
            <p className="mt-4">
              You are responsible for maintaining the confidentiality of your account and password,
              including but not limited to the restriction of access to your computer and/or
              account. You agree to accept responsibility for any and all activities or actions that
              occur under your account and/or password, whether your password is with our Service or
              a third-party service. You must notify us immediately upon becoming aware of any
              breach of security or unauthorized use of your account.
            </p>
            <p className="mt-4">
              You may not use as a username the name of another person or entity or that is not
              lawfully available for use, a name or trademark that is subject to any rights of
              another person or entity other than you, without appropriate authorization. You may
              not use as a username any name that is offensive, vulgar or obscene.
            </p>
          </div>

          {/* Mental Health Service Limitations */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Mental Health Service Limitations
            </h2>
            <p>
              Codeword is a peer support and crisis communication tool, NOT a replacement for
              professional mental health treatment, therapy, or medical care. We do not provide
              medical advice, diagnosis, or treatment. Always consult with qualified healthcare
              professionals for mental health concerns.
            </p>
          </div>

          {/* AI Coach Disclaimer and Liability Limitations */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              AI Coach Disclaimer and Liability Limitations
            </h2>
            <p>
              The Codeword AI Coach feature is an artificial intelligence-powered conversational
              tool designed to provide general support and guidance. By using this feature, you
              acknowledge and agree to the following important limitations and disclaimers:
            </p>
            <div className="mt-4 space-y-4">
              <p>
                <strong>Not a Licensed Professional:</strong> The AI Coach is not a licensed
                therapist, counselor, psychologist, psychiatrist, or any other type of mental health
                professional. It does not have professional training, credentials, or qualifications
                to provide mental health treatment, therapy, or clinical advice.
              </p>
              <p>
                <strong>No Professional Relationship:</strong> Use of the AI Coach does not create a
                doctor-patient, therapist-client, or any other professional relationship. The AI
                Coach cannot and does not provide professional mental health services, medical
                advice, diagnosis, or treatment recommendations.
              </p>
              <p>
                <strong>General Information Only:</strong> All responses, suggestions, and content
                provided by the AI Coach are for general informational and educational purposes
                only. They should not be considered as professional advice, medical recommendations,
                or treatment plans for any specific condition or situation.
              </p>
              <p>
                <strong>Not a Substitute for Professional Care:</strong> The AI Coach is not
                intended to replace, substitute for, or serve as an alternative to professional
                mental health care, medical treatment, or emergency services. If you are
                experiencing a mental health crisis, suicidal thoughts, or any medical emergency,
                immediately contact emergency services (911), a crisis hotline, or seek immediate
                professional help.
              </p>
              <p>
                <strong>Limitation of Liability:</strong> Codeword Technologies Inc, its officers,
                directors, employees, agents, and affiliates shall not be liable for any decisions
                made, actions taken, or outcomes resulting from your use of or reliance on the AI
                Coach feature. You use the AI Coach at your own risk and discretion.
              </p>
              <p>
                <strong>AI Limitations:</strong> The AI Coach is powered by artificial intelligence
                technology that may produce inaccurate, incomplete, inappropriate, or potentially
                harmful responses. The AI may not understand context, nuance, or the severity of
                your situation. We cannot guarantee the accuracy, reliability, or appropriateness of
                AI-generated content.
              </p>
              <p>
                <strong>User Responsibility:</strong> You are solely responsible for evaluating the
                appropriateness and accuracy of any information or suggestions provided by the AI
                Coach. You should always consult with qualified mental health professionals, medical
                doctors, or other appropriate professionals before making any decisions related to
                your mental health, medical care, or well-being.
              </p>
              <p>
                <strong>No Warranty:</strong> We provide the AI Coach feature "as is" without any
                warranties, express or implied, regarding its accuracy, reliability, completeness,
                or fitness for any particular purpose. We disclaim all warranties related to the AI
                Coach feature to the fullest extent permitted by law.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Intellectual Property
            </h2>
            <p>
              The Service and its original content, features and functionality are and will remain
              the exclusive property of Codeword Technologies and its licensors. The Service is
              protected by copyright, trademark, and other laws of both the United States and
              foreign countries. Our trademarks and trade dress may not be used in connection with
              any product or service without the prior written consent of Codeword Technologies.
            </p>
          </div>

          {/* Links To Other Web Sites */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Links To Other Web Sites
            </h2>
            <p>
              Our Service may contain links to third party web sites or services that are not owned
              or controlled by Codeword Technologies Inc.
            </p>
            <p className="mt-4">
              Codeword Technologies Inc has no control over, and assumes no responsibility for the
              content, privacy policies, or practices of any third party web sites or services. We
              do not warrant the offerings of any of these entities/individuals or their websites.
            </p>
            <p className="mt-4">
              You acknowledge and agree that Codeword Technologies Inc shall not be responsible or
              liable, directly or indirectly, for any damage or loss caused or alleged to be caused
              by or in connection with use of or reliance on any such content, goods or services
              available on or through any such third party web sites or services.
            </p>
            <p className="mt-4">
              We strongly advise you to read the terms and conditions and privacy policies of any
              third party web sites or services that you visit.
            </p>
          </div>

          {/* SMS Opt-in */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              SMS Communications Opt-in
            </h2>
            <div className="space-y-3">
              <p>
                1. When you opt-in to the service, we will send you an SMS message to confirm your
                signup.
              </p>
              <p>2. Codeword will send you SMS messages to update your trusted contacts' status.</p>
              <p>
                3. You can cancel the SMS service at any time. Just text "STOP" to the short code.
                After you send the SMS message "STOP" to us, we will send you an SMS message to
                confirm that you have been unsubscribed. After this, you will no longer receive SMS
                messages from us. If you want to join again, just sign up as you did the first time
                and we will start sending SMS messages to you again.
              </p>
              <p>
                4. If at any time you forget what keywords are supported, just text "HELP" to the
                short code. After you send the SMS message "HELP" to us, we will respond with
                instructions on how to use our service as well as how to unsubscribe.
              </p>
              <p>
                5. We are able to deliver messages to the following mobile phone carriers: Major
                carriers: AT&T, Verizon Wireless, Sprint, T-Mobile, MetroPCS, U.S. Cellular, Alltel,
                Boost Mobile, Nextel, and Virgin Mobile. Minor carriers: Alaska Communications
                Systems (ACS), Appalachian Wireless (EKN), Bluegrass Cellular, Cellular One of East
                Central IL (ECIT), Cellular One of Northeast Pennsylvania, Cincinnati Bell Wireless,
                Cricket, Coral Wireless (Mobi PCS), COX, Cross, Element Mobile (Flat Wireless), Epic
                Touch (Elkhart Telephone), GCI, Golden State, Hawkeye (Chat Mobility), Hawkeye (NW
                Missouri), Illinois Valley Cellular, Inland Cellular, iWireless (Iowa Wireless),
                Keystone Wireless (Immix Wireless/PC Man), Mosaic (Consolidated or CTC Telecom),
                Nex-Tech Wireless, NTelos, Panhandle Communications, Pioneer, Plateau (Texas RSA 3
                Ltd), Revol, RINA, Simmetry (TMP Corporation), Thumb Cellular, Union Wireless,
                United Wireless, Viaero Wireless, and West Central (WCC or 5 Star Wireless).
                ***Carriers are not liable for delayed or undelivered messages***
              </p>
              <p>
                6. As always, message and data rates may apply for any messages sent to you from us
                and to us from you. You will receive up to 5 text messages per Codeword Alert. If
                you have any questions about your text plan or data plan, it is best to contact your
                wireless provider. For all questions about the services provided by this short code,
                you can send an email to{' '}
                <a
                  href="mailto:info@ourcodeword.com"
                  className="underline"
                  style={{ color: '#642975' }}
                >
                  info@ourcodeword.com
                </a>
                .
              </p>
              <p>
                7. If you have any questions regarding privacy, please read our privacy policy:
                https://www.ourcodeword.com/privacy-policy
              </p>
            </div>
          </div>

          {/* Termination */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Termination
            </h2>
            <p>
              We may terminate or suspend your account and bar access to the Service immediately,
              without prior notice or liability, under our sole discretion, for any reason
              whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
            <p className="mt-4">
              If you wish to terminate your account, you may simply discontinue using the Service.
            </p>
            <p className="mt-4">
              All provisions of the Terms which by their nature should survive termination shall
              survive termination, including, without limitation, ownership provisions, warranty
              disclaimers, indemnity and limitations of liability.
            </p>
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Indemnification
            </h2>
            <p>
              Codeword is a mental health tool to keep users connected with their trusted contacts.
            </p>
            <p className="mt-4">If you need immediate help, call 911.</p>
            <p className="mt-4">
              You will indemnify and hold harmless Codeword Technologies Inc, and its officers,
              directors, employees, and agents, from and against any claims, disputes, demands,
              liabilities, damages, losses, and costs and expenses, including, without limitation,
              reasonable legal and accounting fees, arising out of or in any way connected with (i)
              your access to or use of the Services or Content or (ii) your violation of these
              Terms.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Limitation of Liability
            </h2>
            <p>
              Neither Codeword Technologies Inc nor any other party involved in creating, producing,
              or delivering the Services, Products or Content will be liable for any incidental,
              special, exemplary or consequential damages, including, but not limited to, lost
              profits, loss of data or goodwill, service interruption, computer damage or system
              failure or the cost of substitute Services or Products arising out of or in connection
              with these terms or from the use of or inability to use the Services, Products or
              Content, whether based on warranty, contract, tort (including negligence), product
              liability or any other legal theory, and whether or not Codeword Technologies Inc has
              been informed of the possibility of such damage, even if a limited remedy set forth
              herein is found to have failed of its essential purpose. Some jurisdictions do not
              allow the exclusion or limitation of liability for consequential or incidental
              damages, so the above limitation may not apply to you.
            </p>
            <p className="mt-4">
              In no event will Codeword Technologies, Inc total liability arising out of or in
              connection with these terms or from the use of or inability to use the Services,
              Products or Content exceed the amounts you have paid to Codeword Technologies, Inc for
              use of the Services, Products or Content or fifty dollars ($50), if you have not had
              any payment obligations to Codeword Technologies, Inc as applicable. The exclusion and
              limitations of damages set forth above are fundamental elements of the basis of the
              bargain between Codeword Technologies, Inc and you.
            </p>
          </div>

          {/* Dispute Resolution */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Dispute Resolution
            </h2>
            <h3 className="text-base mb-2" style={{ fontWeight: 600 }}>
              Governing Law
            </h3>
            <p>
              These Terms and any action related thereto will be governed by the laws of the State
              of Delaware without regard to its conflict of laws provisions.
            </p>

            <h3 className="text-base mb-2 mt-4" style={{ fontWeight: 600 }}>
              Agreement to Arbitrate
            </h3>
            <p>
              You and Codeword Technologies, Inc. agree that any dispute, claim or controversy
              arising out of or relating to these Terms or the breach, termination, enforcement,
              interpretation or validity thereof or the use of the Services, Products or Content
              (collectively, "Disputes") will be settled by binding arbitration, except that each
              party retains the right: (i) to bring an individual action in small claims court and
              (ii) to seek injunctive or other equitable relief in a court of competent jurisdiction
              to prevent the actual or threatened infringement, misappropriation or violation of a
              party's copyrights, trademarks, trade secrets, patents or other intellectual property
              rights (the action described in the foregoing clause (ii), an "IP Protection Action").
              Without limiting the preceding sentence, you will also have the right to litigate any
              other Dispute if you provide Codeword Technologies, Inc. with written notice of your
              desire to do so by email at{' '}
              <a
                href="mailto:info@ourcodeword.com"
                className="underline"
                style={{ color: '#642975' }}
              >
                info@ourcodeword.com
              </a>{' '}
              within thirty (30) days following the date you first agree to these Terms (such
              notice, an "Arbitration Opt-out Notice"). If you don't provide Codeword Technologies,
              Inc. with an Arbitration Opt-out Notice within the thirty (30) day period, you will be
              deemed to have knowingly and intentionally waived your right to litigate any Dispute
              except as expressly set forth in clauses (i) and (ii) above. The exclusive
              jurisdiction and venue of any IP Protection Action or, if you timely provide Codeword
              Technologies, Inc. with an Arbitration Opt-out Notice, will be the state and federal
              courts and each of the parties hereto waives any objection to jurisdiction and venue
              in such courts. Unless you timely provide Codeword Technologies, Inc. with an
              Arbitration Opt-out Notice, you acknowledge and agree that you and Codeword
              Technologies, Inc. are each waiving the right to a trial by jury or to participate as
              a plaintiff or class member in any purported class action or representative
              proceeding. Further, unless both you and Codeword Technologies, Inc. otherwise agree
              in writing, the arbitrator may not consolidate more than one person's claims, and may
              not otherwise preside over any form of any class or representative proceeding. If this
              specific paragraph is held unenforceable, then the entirety of this "Dispute
              Resolution" section will be deemed void. Except as provided in the preceding sentence,
              this "Dispute Resolution" section will survive any termination of these Terms.
            </p>

            <h3 className="text-base mb-2 mt-4" style={{ fontWeight: 600 }}>
              Arbitration Rules
            </h3>
            <p>
              The arbitration will be administered by the American Arbitration Association ("AAA")
              in accordance with the Commercial Arbitration Rules and the Supplementary Procedures
              for Consumer Related Disputes (the "AAA Rules") then in effect, except as modified by
              this "Dispute Resolution" section. (The AAA Rules are available at www.adr.org/arb_med
              or by calling the AAA at 1-800-778-7879.) The Federal Arbitration Act will govern the
              interpretation and enforcement of this Section.
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Disclaimer
            </h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS"
              and "AS AVAILABLE" basis. The Service is provided without warranties of any kind,
              whether express or implied, including, but not limited to, implied warranties of
              merchantability, fitness for a particular purpose, non-infringement or course of
              performance.
            </p>
            <p className="mt-4">
              Codeword Technologies, Inc its subsidiaries, affiliates, and its licensors do not
              warrant that a) the Service will function uninterrupted, secure or available at any
              particular time or location; b) any errors or defects will be corrected; c) the
              Service is free of viruses or other harmful components; or d) the results of using the
              Service will meet your requirements.
            </p>
          </div>

          {/* Exclusions */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Exclusions
            </h2>
            <p>
              Some jurisdictions do not allow the exclusion of certain warranties or the exclusion
              or limitation of liability for consequential or incidental damages, so the limitations
              above may not apply to you.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Governing Law
            </h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Delaware,
              United States, without regard to its conflict of law provisions.
            </p>
            <p className="mt-4">
              Our failure to enforce any right or provision of these Terms will not be considered a
              waiver of those rights. If any provision of these Terms is held to be invalid or
              unenforceable by a court, the remaining provisions of these Terms will remain in
              effect. These Terms constitute the entire agreement between us regarding our Service,
              and supersede and replace any prior agreements we might have had between us regarding
              the Service.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Changes
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any
              time. If a revision is material we will provide at least 30 days notice prior to any
              new terms taking effect. What constitutes a material change will be determined at our
              sole discretion.
            </p>
            <p className="mt-4">
              By continuing to access or use our Service after any revisions become effective, you
              agree to be bound by the revised terms. If you do not agree to the new terms, you are
              no longer authorized to use the Service.
            </p>
          </div>

          {/* Contact Us */}
          <div className="mb-8">
            <h2 className="text-lg mb-3" style={{ fontWeight: 600 }}>
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, you can reach our customer support center
              at:{' '}
              <a
                href="mailto:info@ourcodeword.com"
                className="underline"
                style={{ color: '#642975' }}
              >
                info@ourcodeword.com
              </a>
            </p>
          </div>

          {/* Scroll indicator */}
          {!hasScrolledToBottom && (
            <div className="text-center text-gray-500 text-sm py-4">
              Please scroll to the bottom to continue
            </div>
          )}
        </div>
      </div>

      {/* Agreement section with extended white background */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 pb-6">
        <div className="flex items-start gap-3 mb-4">
          <input
            type="checkbox"
            id="terms-agreement"
            checked={hasAccepted}
            onChange={(e) => setHasAccepted(e.target.checked)}
            className="mt-1 w-6 h-6 border-2 border-gray-300 focus:ring-2"
            style={{
              accentColor: '#642975',
              focusRingColor: '#642975',
            }}
            disabled={!hasScrolledToBottom}
          />
          <label
            htmlFor="terms-agreement"
            className="text-sm text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Inter' }}
          >
            I have read and agree to the Terms and Conditions, Privacy Policy, and SMS
            communications. I understand that Codeword is not intended for emergency situations and
            that I should call 911 or contact crisis services for immediate help.
          </label>
        </div>

        <button
          onClick={handleAccept}
          disabled={!hasAccepted || !hasScrolledToBottom}
          className={`w-full py-4 rounded-full transition-all ${
            hasAccepted && hasScrolledToBottom
              ? 'bg-black text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          style={{ fontFamily: 'Inter', fontWeight: 500 }}
        >
          {!hasScrolledToBottom ? 'Please scroll to bottom' : 'Accept & Continue'}
        </button>
      </div>
    </div>
  );
}
