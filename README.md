# Custom Monketype Themes

To apply a custom theme to ```monkeytype.com```:
- If the theme filetype is ```*.css```:
	- Install the ```Stylus``` extension on a browser that supports it.
	- Then create a style on the extension for ```https://monkeytype.com/*``` and paste/save the code from ```*.css```.
- If the theme filetype is ```*.js```:
	- Install ```Violentmonkey```, ```Tampermonkey```, or ```FireMonkey``` extension on a browser that supports it.
		- I personally use ```Violentmonkey``` but they should all work fine.
	- Then create a script on the extension for ```https://monkeytype.com/*``` and paste/save the code from ```*.js```.

If your version doesn't look exactly like mine you and you want it to:
- Import ```monkeytype_settings.json``` in settings on ```monkeytype.com```. Keep in mind that this will delete your settings so make sure to export yours before doing so.

If the keyboard positioning is off:
- You can try fiddling with the section titled ```/* Typing */```.
- You should see ```#typingTest``` which is both the text and keyboard.
	- For text only go to ```#wordsWrapper```.
	- For keyboard only go to ```.keymap```.

If the keyboard looks weird:
- Try refreshing. I find that when I apply a page style from ```Stylus```, some elements often look off which immediately gets resolved after a refresh.

Man.. it still looks weird:
- I wrote the css+js for ```Chrome``` and only checked ```1920x1080```/```2560x1080```.
- Sorry about that and if that wasn't it, I'm not sure.
