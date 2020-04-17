import React from "react";
import VegogoButton from "../components/VegogoButton";

export default function () {
  return (
    <React.Fragment>
      <div className="flex bg-vegogo-green text-center">
        <div className="max-w-lg py-10 mt-10 mx-6">
          <p className="text-3xl font-bold leading-snug mb-6">
            Love vegan as much as we do? Sign up for our newsletter on what’s to
            come.
          </p>

          <div id="mc_embed_signup">
            <form
              action="https://vegogo.us18.list-manage.com/subscribe/post?u=ba9f0358f5c621215aca582dc&amp;id=fab6881f8a"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
              noValidate
            >
              <div>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    name="EMAIL"
                    id="mce-EMAIL"
                    className="py-4 px-8 text-center w-3/4"
                  />
                </div>
                <div>
                  <VegogoButton
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                  >
                    Yes, sign me up!
                  </VegogoButton>
                </div>
              </div>

              <div>
                <p className="mt-4">
                  (No spamming promise! Just news and deals you don’t want to
                  miss!)
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
