export const genEmail = (token: string, expires: number) => {
  return `
  <div 
        style="
          background-color: #f1f1f1;
          width: 400px;
          height: 300px;
          padding: 1em;
          color: black;
        "
      >
        <div style="text-align: center;">
          <img
            style="height: 3em"
            src="${process.env.DOMAIN}/logo.svg"
            alt="iEARN Žiežmariai"
          />
        </div>
        <h2 style="text-align: center; font-family: sans-serif">
          Pasikeisti slaptažodį:
        </h2>
        <p style="text-align: center; font-family: sans-serif">
          Jūs užmiršote Admin slaptažodį ir paprašėte jį pakesti. Paspauskite ant
          mygtuko, kad jį ataujintumėt.
        </p>
        <div
          style="
          text-align: center;
            width: 100%;
            margin-top: 2em;
          "
        >
          <a
            style="
              padding: 1em;
              text-decoration: none;
              color: white;
              background-color: #2b7c4a;
              border-radius: 5px;
              font-family: sans-serif;
            "
            href="${process.env.DOMAIN}/admin/pakeisti-slaptazodi/${token}"
            ><b>Pakeisti slaptažodį</b></a
          >
        </div>
        <p style="margin-top: 2em; text-align: center; font-family: sans-serif">
          <b>${new Date().toLocaleDateString("lt-LT")}</b>
        </p>
      </div>
  `;
  expires;
};
