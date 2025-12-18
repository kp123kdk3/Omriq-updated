import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import Script from "next/script";

export function BookDemo() {
  return (
    <section id="book-demo" className="border-t border-border bg-background">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Book a demo</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-4 text-lg leading-8 text-muted">
                A short, executive friendly walkthrough tailored to your property. Call flows, training scope, and
                integration paths.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface p-2 sm:p-3">
                <div className="rounded-2xl border border-border bg-white p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-foreground">Schedule with Calendly</div>
                      <div className="mt-1 text-sm text-muted">
                        Investor bookings are handled via Calendly.
                      </div>
                    </div>
                  </div>

                  <div
                    className="calendly-inline-widget mt-4 min-w-[320px] rounded-xl border border-border bg-white h-[700px]"
                    data-url="https://calendly.com/popovbusiness11"
                  />

                  <noscript>
                    <p className="mt-3 text-sm text-muted">
                      Please enable JavaScript to load the scheduling widget.
                    </p>
                  </noscript>

                  <Script
                    src="https://assets.calendly.com/assets/external/widget.js"
                    strategy="afterInteractive"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}


