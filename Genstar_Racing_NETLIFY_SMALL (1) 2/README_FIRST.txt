GENSTAR RACING | EASY HORSE UPDATES
=================================
This package preserves the Genstar Racing website, adds a live public
Horse Updates feed with photos & videos, and adds an editor at /admin/.

WHAT IS INCLUDED
- index.html (public website)
- media/ (horse images, website scripts & styles)
- content/horse-updates.json (public updates)
- admin/index.html + admin/config.yml (Decap CMS, free open-source editor)
- netlify.toml (static hosting settings)

HOW YOU'LL POST UPDATES (AFTER ONE-TIME SETUP)
1. Visit https://YOUR-SITE.netlify.app/admin/
2. Sign in using GitHub.
3. Select Stable Updates > Post & Manage Horse Updates.
4. Click Add Horse Updates, pick a horse, choose the date and title.
5. Type the report; click + to upload multiple photos; paste a YouTube video
   link, OR upload a short/small MP4 video.
6. Click Publish. Netlify automatically updates the public website via GitHub.
   Updates appear in the site's Horse Updates section, newest first.

ONE-TIME SETUP REQUIRED TO MAKE PUBLISH WORK
A. Create a GitHub account (if you don't have one) at github.com.
B. Create a GitHub repository named genstar-racing-website, and upload the
   CONTENTS OF THIS FOLDER to the repository root. Keep all images/files.
   GitHub's web upload can be used for this.
C. Edit admin/config.yml: replace YOUR_GITHUB_USERNAME with your account name.
   If your repository has another name, change that too. Commit the change.
D. In Netlify: Add new project > Import an existing project > GitHub;
   choose your repository; deploy with no build command and publish directory .
E. Set up GitHub OAuth once (required by the editor):
   * GitHub > Settings > Developer Settings > OAuth Apps > New OAuth App.
   * Application URL: your live Netlify URL.
   * Callback URL: https://api.netlify.com/auth/done
   * Generate Client ID and Client Secret (do not place secrets in site files).
   * Netlify > Project configuration > Security > OAuth > Install Provider
     > GitHub. Enter the credentials THERE, not in this HTML or chat.
F. Visit https://YOUR-SITE.netlify.app/admin/ and publish one test update.
   After Netlify completes its GitHub deploy, verify that update appears on
   the public site using another browser/incognito.

IMPORTANT
- Drag-and-drop Netlify deployment will display the public site and feed,
  but WILL NOT allow permanent CMS publishing. GitHub-connected deployment
  and OAuth are essential for the admin editor.
- Videos from YouTube or Vimeo embed on the public site. You can upload
  short local video clips, but large video files should be on YouTube.
- Uploading a photo is part of the admin edit; it is not automatically live
  until you click Publish and the site finishes deploying.
- This is a content editor, not the owner portal. Purchase/payment/login
  functionality from the original website remains a demo and must not be
  represented as a payment-ready or secure membership system.
- /admin is discoverable; GitHub OAuth permissions restrict writing, but
  do not share your GitHub account with others.
- Users with repository write permission can publish. Invite Chris as a
  GitHub collaborator only if you want him to publish content directly.

HELPFUL DOCS
Netlify repository deploy: https://docs.netlify.com/start/quickstarts/deploy-from-repository/
Netlify GitHub OAuth: https://docs.netlify.com/manage/security/secure-access-to-sites/oauth-provider-tokens/
Decap Github backend: https://decapcms.org/docs/github-backend/
