import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center text-center mb-12">
        <p className="text-sm text-gray-500 mb-2">Updated: May 17, 2024</p>
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
      </div>{' '}
      <p className="mb-4">
        Welcome to <span className="font-semibold">TaxIntelligence</span>. We
        are committed to protecting your personal information and your right to
        privacy. If you have any questions or concerns about our policy, or our
        practices with regards to your personal information, please contact us
        at <span className="font-semibold">support@davcnainteligenca.com</span>.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We only collect the following personal information from you:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Email Address:</strong> Used for account creation, login, and
          communication purposes.
        </li>
        <li>
          <strong>Name:</strong> Used to personalize your experience on our
          website.
        </li>
        <li>
          <strong>Profile Picture:</strong> Used to display your profile picture
          within our application.
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">We use the information we collect or receive:</p>
      <ul className="list-disc list-inside mb-4">
        <li>To facilitate account creation and login process.</li>
        <li>To manage user accounts.</li>
        <li>To send administrative information to you.</li>
        <li>
          To enforce our terms, conditions, and policies for business purposes,
          to comply with legal and regulatory requirements or in connection with
          our contract.
        </li>
        <li>To respond to legal requests and prevent harm.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        3. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not share, sell, rent, or trade any of your information with third
        parties for their promotional purposes.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">4. Data Security</h2>
      <p className="mb-4">
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable, and no method of data transmission can be guaranteed
        against any interception or other type of misuse.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        5. Your Privacy Rights
      </h2>
      <p className="mb-4">
        In some regions (like the European Economic Area), you have certain
        rights under applicable data protection laws. These may include the
        right (i) to request access and obtain a copy of your personal
        information, (ii) to request rectification or erasure; (iii) to restrict
        the processing of your personal information; and (iv) if applicable, to
        data portability. In certain circumstances, you may also have the right
        to object to the processing of your personal information.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">6. Contact Us</h2>
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
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        7. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this privacy policy from time to time in order to reflect,
        for example, changes to our practices or for other operational, legal,
        or regulatory reasons.
      </p>
      <p className="font-semibold">Effective Date: 17.5.2024</p>
    </div>
  )
}

export default PrivacyPolicy
