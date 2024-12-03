The canary order does nothing except run on a cooldown and hand tokens over to
the solver for free (to pay for gas).

It is useful only to show that orders clear on some network. If the canary is
deployed and does not run, it means that there are no solvers monitoring the
network, or at least not the raindex contract that the canary is deployed on.

The canary is basically a stripped back version of the sampler. It runs but
doesn't sample anything.

Anyone can deploy this strat and fund it themselves to convince themselves that
there is at least one solver operational on some network.

It's somewhat morbidly named after canaries in old coal mines that would quickly
die if there was a gas leak, hopefully alerting everyone else to evacuate to
safety in time, or repair the leak.
