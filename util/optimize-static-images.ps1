param(
	$Directory = "./public/images",
	[Switch] $Recreate = $false
)

if(-not (Test-Path -Path $Directory)) {
	throw "Directory ``$Directory' does not exist."
}

try {
	Get-Command magick | Out-Null
}
catch {
	throw "Magick not found"
}

Write-Output "Optimizing images in ``$Directory'"

Get-ChildItem -Path $Directory/* -Recurse -Include *.png,*.jpg |
	ForEach-Object {
		$OutPath = [System.IO.Path]::ChangeExtension($_.FullName, "webp")
		if(($Recreate) -or (-not (Test-Path -Path $OutPath -PathType Leaf))) {
			Write-Output $OutPath
			magick convert -quality 90 -background none -auto-orient $_ $OutPath
		}
		else {
			Write-Output "Skipping ``$OutPath' (Already exists)"
		}
	}
