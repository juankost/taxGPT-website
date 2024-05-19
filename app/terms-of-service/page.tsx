import React from 'react'

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center text-center mb-12">
        <p className="text-sm text-gray-500 mb-2">Updated: May 17, 2024</p>
        <h1 className="text-4xl font-bold">Terms of Service</h1>
      </div>
      <p className="mb-4">
        Welcome to TaxIntelligence. These Terms of Service (&quot;Terms&quot;)
        govern your use of our website located at [Your Website URL] and our
        services (collectively, &quot;Services&quot;). By accessing or using our
        Services, you agree to be bound by these Terms. If you do not agree to
        these Terms, please do not use our Services.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">1. Use of Services</h2>
      <h3 className="text-xl font-semibold mt-4 mb-2">Eligibility</h3>
      <p className="mb-4">
        You must be at least 18 years old to use our Services. By using our
        Services, you represent and warrant that you meet this requirement.
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2">Account Registration</h3>
      <p className="mb-4">
        To access certain features of our Services, you may be required to
        register for an account. You agree to provide accurate, current, and
        complete information during the registration process and to update such
        information to keep it accurate, current, and complete. You are
        responsible for safeguarding your password and for all activities that
        occur under your account.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">2. User Conduct</h2>
      <p className="mb-4">
        You agree not to use our Services for any unlawful or prohibited
        purpose. You agree not to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Violate any applicable laws or regulations.</li>
        <li>Infringe the intellectual property rights of others.</li>
        <li>Transmit any harmful or malicious code.</li>
        <li>
          Engage in any activity that could damage, disable, or impair the
          functioning of our Services.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">3. Use of OpenAI API</h2>
      <p className="mb-4">
        Our app uses the OpenAI API to provide certain functionalities. By using
        our Services, you agree to comply with OpenAI&apos;s{' '}
        <a
          href="https://openai.com/terms"
          className="text-blue-500 hover:underline"
        >
          Terms of Use
        </a>{' '}
        and{' '}
        <a
          href="https://openai.com/policies/usage-policies"
          className="text-blue-500 hover:underline"
        >
          Usage Policies
        </a>
        . You acknowledge and agree that:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          You will not use the OpenAI API to generate content that is illegal,
          harmful, or violates any applicable laws or regulations.
        </li>
        <li>
          You will not use the OpenAI API to create or disseminate false or
          misleading information.
        </li>
        <li>
          You will not use the OpenAI API to generate content that infringes the
          intellectual property rights of others.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        4. Intellectual Property
      </h2>
      <p className="mb-4">
        All content and materials available on our Services, including but not
        limited to text, graphics, website name, code, images, and logos, are
        the intellectual property of TaxIntelligence and are protected y
        applicable copyright, trademark, and other intellectual property laws.
        You agree not to reproduce, distribute, modify, or create derivative
        works of any content without our prior written consent.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">5. Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate or suspend your access to our Services
        at any time, without prior notice or liability, for any reason
        whatsoever, including without limitation if you breach these Terms.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        6. Limitation of Liability
      </h2>
      <p className="mb-4">
        In no event shall TaxIntelligence, nor its directors, employees,
        partners, agents, suppliers, or affiliates, be liable for any indirect,
        incidental, special, consequential, or punitive damages, including
        without limitation, loss of profits, data, use, goodwill, or other
        intangible losses, resulting from (i) your use or inability to use our
        Services; (ii) any unauthorized access to or use of our servers and/or
        any personal information stored therein; (iii) any interruption or
        cessation of transmission to or from our Services; (iv) any bugs,
        viruses, trojan horses, or the like that may be transmitted to or
        through our Services by any third party; (v) any errors or omissions in
        any content or for any loss or damage incurred as a result of the use of
        any content posted, emailed, transmitted, or otherwise made available
        through our Services; and/or (vi) the defamatory, offensive, or illegal
        conduct of any third party. In no event shall our aggregate liability
        exceed the amount paid by you, if any, for accessing or using our
        Services.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">7. Governing Law</h2>
      <p className="mb-4">
        These Terms shall be governed and construed in accordance with the laws
        of [Your Country/State], without regard to its conflict of law
        provisions. Our failure to enforce any right or provision of these Terms
        will not be considered a waiver of those rights. If any provision of
        these Terms is held to be invalid or unenforceable by a court, the
        remaining provisions of these Terms will remain in effect. These Terms
        constitute the entire agreement between us regarding our Services, and
        supersede and replace any prior agreements we might have had between us
        regarding the Services.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">8. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material, we will provide at least
        30 days&apos; notice prior to any new terms taking effect. What
        constitutes a material change will be determined at our sole discretion.
        By continuing to access or use our Services after those revisions become
        effective, you agree to be bound by the revised terms. If you do not
        agree to the new terms, please stop using the Services.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or comments about this policy, you may email
        us at:{' '}
        <a
          href="mailto:support@davcnainteligenca.com"
          className="text-blue-500 hover:underline"
        >
          support@davcnainteligenca.com
        </a>
      </p>
    </div>
  )
}

export default TermsOfService
