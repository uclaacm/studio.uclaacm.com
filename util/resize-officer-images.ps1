param(
	$Directory = ".",
	$Output = "out"
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

if(-not (Test-Path -Path $Output)) {
	if(Test-Path -Path $Output -PathType Leaf) {
		throw "Output ``$Output' is a file."
	}
	New-Item -ItemType Directory -Path $Output | Out-Null
}

Get-ChildItem -Path $Directory/* -Include *.png,*.jpg |
	ForEach-Object {
		$OutPath = Join-Path -Path $Output -ChildPath $([System.IO.Path]::ChangeExtension($_.Name, "webp"))
		Write-Output $OutPath
		magick convert -auto-orient -resize 600x $_ $OutPath
	}

