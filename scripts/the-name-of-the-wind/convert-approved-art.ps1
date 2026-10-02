param([int]$Quality=84)
Add-Type -AssemblyName System.Drawing
$repo=Resolve-Path (Join-Path $PSScriptRoot '..\..')
$art=Join-Path $repo 'library\the-name-of-the-wind\art\generated'
$codec=[Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()|Where-Object MimeType -eq 'image/jpeg'
$params=[Drawing.Imaging.EncoderParameters]::new(1)
$params.Param[0]=[Drawing.Imaging.EncoderParameter]::new([Drawing.Imaging.Encoder]::Quality,[long]$Quality)
$files=@(Get-ChildItem $art -Filter '*.png' -File|Sort-Object Name)
if($files.Count -ne 23){throw "Expected 23 approved PNG masters, got $($files.Count)"}
foreach($f in $files){
  $im=[Drawing.Image]::FromFile($f.FullName)
  $target=[IO.Path]::ChangeExtension($f.FullName,'.jpg')
  $im.Save($target,$codec,$params)
  $im.Dispose()
  $check=[Drawing.Image]::FromFile($target);$check.Dispose()
  Write-Output $target
}
$params.Dispose()
