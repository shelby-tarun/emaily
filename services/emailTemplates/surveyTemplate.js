const keys = require('../../config/keys');

module.exports = (survey) => {
    return `
    <html>
        <body>
        <div
        style="text-align: center;
               font-family: sans-serif;
               background-color: lightgrey;
               padding: 20px 10px;
               margin-bottom: 10px";
            >
            <h2>I'd like your input!</h2>
            <h4>Please answer the following question:</h4>
            <p>${survey.body}</p>
            <div>
                <a
                    href="${keys.redirectDomain}/api/surveys/thanks"
                    style="background-color: #2296FF;
                            padding: 10px;
                            text-decoration: none;
                            margin-right: 10px;
                            color: white; font-weight: bold;
                            align-item: center;
                            "
                    >
                    Yes
                </a>
                <a
                    href="${keys.redirectDomain}/api/surveys/thanks"
                    style="background-color: #2296FF;
                            padding: 10px;
                            text-decoration: none;
                            margin-right: 10px;
                            color: white; font-weight: bold;
                            align-item: center;"
                    >
                    No
                </a>
            </div>
        </div>
        <div style="color: grey; font-weight: bold;">
            Emaily
        </div>
        </body>
    </html>
    `;
};