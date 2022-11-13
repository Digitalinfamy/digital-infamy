import { ResponseError } from "@sendgrid/helpers/classes";
import sendgrid from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import { NextError } from "next/dist/lib/is-error";
import z from "zod";
import { env } from "../../env/server.mjs";

sendgrid.setApiKey(env.SENDGRID_API_KEY);

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  subject: z.string({
    required_error: "Please enter a subject"
  }).min(1, { message: "Please enter a subject." }),
  fullname: z.string().min(1, { message: "Please tell us your name." }),
  message: z.string().min(1, { message: "Please enter a message." })
});

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("REQ.BODY", req.body);
    schema.parse(req.body);

    await sendgrid.send({
      to: "hello@digitalinfamy.com", // Your email where you'll receive emails
      from: {
        email: "andrew.allison@digitalinfamy.com",
        name: "Website Contact"
      }, // your website email address here
      subject: `${req.body.subject}-${req.body.fullname}`,
      html: `${req.body.message}\r\n${req.body.email}`
    });
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof ResponseError) {
      return res.status(error.code || 500).json({ error: error.message });
    }
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;