# Railway frontend build

> Hacked together for a railway interview.

Can sign up as a user with your railway API key. Can view your projects and create new projects, and see deployments for latest project. Can click into projects and see services/environment variables/deploys. Can spin up template services, delete services, and redeploy deploys.


### Whats in use

Vite for bundler, find it faster then webpack. Pretty standard react frontend. Hitting backend with graph requests. Didn't bother with token/jwt, using a super hacky header to verify requests to the backend (yes super insecure, but I put a limit on my railway account usage hah), so reload and you'll have to relogin. Didn't bother with tests for this. Used a mix of NextUI and also Shadcn, the former as it was easy, the later as I personally have been wanting to try it out. Bizare mix of tailwind and css, wasn't really focused on quality here too much, Ditto with code makeup, could be refactored to the nth degree in so many different ways. Also used tanstack router, again just personally wanted to try it out.
