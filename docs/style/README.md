## Usage

***CSS files with underscore `_` are the compiled result from the `extra_sass` directory, which contains Bootstrap style.***
- For example, from the `root` of the repository:
```bash
sass docs/extra_sass/_buttons.scss docs/style/bootstrap/_buttons.css
```
- Add the compiled file to `mkdocs.yml/extra_css`